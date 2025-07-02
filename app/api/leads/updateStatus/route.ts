// // app/api/leads/updateStatus/route.ts
// import { NextResponse } from 'next/server';
// import pool from '../../../lib/db';

// export async function POST(req: Request) {
//   try {
//     const { leadId, status } = await req.json();
//     await pool.query('UPDATE leads SET status = $1 WHERE id = $2', [status, leadId]);
//     return NextResponse.json({ success: true });
//   } catch (err) {
//     return NextResponse.json({ success: false }, { status: 500 });
//   }
// }

// server

import { supabase } from '../../../lib/supabaseClient';

export async function POST(req: Request) {
  const body = await req.json();
  const { leadId, status } = body;

  const { error } = await supabase.from('leads').update({ status }).eq('id', leadId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}