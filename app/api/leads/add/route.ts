// import { NextRequest, NextResponse } from 'next/server';
// import pool from '../../../lib/db';

// export async function POST(req: NextRequest) {
//   const { name, phone, status, userId } = await req.json();

//   if (!name || !phone || !status || !userId) {
//     return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
//   }

//   try {
//     const result = await pool.query(
//       'INSERT INTO leads (name, phone, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
//       [name, phone, status, userId]
//     );

//     return NextResponse.json({ message: 'Lead added', lead: result.rows[0] }, { status: 201 });
//   } catch (err) {
//     console.error('Lead add error:', err);
//     return NextResponse.json({ message: 'Failed to add lead' }, { status: 500 });
//   }
// }

// server

import { supabase } from '../../../lib/supabaseClient';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, phone, status, userId } = body;

  const { error } = await supabase.from('leads').insert([
    { name, phone, status, user_id: userId }
  ]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
