// // app/api/leads/user/route.ts
// import { NextResponse } from 'next/server';
// import pool from '../../../lib/db';

// export async function POST(req: Request) {
//   try {
//     const { userId } = await req.json();
//     const result = await pool.query('SELECT * FROM leads WHERE user_id = $1', [userId]);
//     return NextResponse.json({ leads: result.rows });
//   } catch (err) {
//     return NextResponse.json({ error: 'DB Error' }, { status: 500 });
//   }
// }

// server
import { supabase } from '../../../lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = parseInt(body.userId);

    if (!userId || isNaN(userId)) {
      return new Response(JSON.stringify({ error: 'Invalid userId' }), { status: 400 });
    }

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ leads: data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid JSON or request' }), { status: 400 });
  }
}