// import { NextRequest, NextResponse } from 'next/server';
// import pool from '../../lib/db';
// import bcrypt from 'bcrypt';

// export async function POST(req: NextRequest) {
//   const { username, password } = await req.json();

//   if (!username || !password) {
//     return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
//   }

//   try {
//     const result = await pool.query(
//       'SELECT * FROM users WHERE username = $1',
//       [username]
//     );

//     const user = result.rows[0];

//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);

//     if (!isPasswordCorrect) {
//       return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
//     }

//     return NextResponse.json({ message: 'Login success', userId: user.id }, { status: 200 });
//   } catch (err) {
//     console.error('Login error:', err);
//     return NextResponse.json({ message: 'Login failed' }, { status: 500 });
//   }
// }

//server
import { supabase } from '../../lib/supabaseClient';

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single();

  if (error || !data) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  }

  return new Response(JSON.stringify({ user: data }), { status: 200 });
}

