// // app/api/signup/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import pool from '../../lib/db';
// import bcrypt from 'bcrypt';

// export async function POST(req: NextRequest) {
//   const { username, email, password } = await req.json();

//   if (!username || !email || !password) {
//     return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
//   }

//   try {
//     const check = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
//     if (check.rows.length > 0) {
//       return NextResponse.json({ message: 'Email already used' }, { status: 409 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//       'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
//       [username, email, hashedPassword]
//     );

//     return NextResponse.json({ message: 'User created', user: result.rows[0] }, { status: 201 });
//   } catch (err) {
//     console.error('Signup error:', err);
//     return NextResponse.json({ message: 'Signup failed' }, { status: 500 });
//   }
// }

//server

import { supabase } from '../../lib/supabaseClient';

export async function POST(req: Request) {
  const { email, username, password } = await req.json();

  // Check if email already exists
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    return new Response(JSON.stringify({ error: 'Email already used' }), { status: 409 });
  }

  const { data, error } = await supabase.from('users').insert([
    { email, username, password }
  ]).select().single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ user: data }), { status: 200 });
}