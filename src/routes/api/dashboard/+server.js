// src/routes/api/dashboard/stats/+server.js
import { json } from '@sveltejs/kit';
import db from '$lib/server/db/neon';
import { verifyToken } from '$lib/server/auth/auth';

export async function GET({ cookies }) {
  // Get auth token from cookies
  const token = cookies.get('authToken');
  
  // Verify authentication
  if (!token) {
    return json({ success: false, message: 'Authentication required' }, { status: 401 });
  }
  
  const user = verifyToken(token);
  if (!user) {
    return json({ success: false, message: 'Invalid authentication token' }, { status: 401 });
  }
  
  try {
    // Get total labels count
    const totalLabelsQuery = `
      SELECT COUNT(*) as count
      FROM logistic_labels
      WHERE user_id = $1
    `;
    const totalLabelsResult = await db.query(totalLabelsQuery, [user.id]);
    const totalLabels = parseInt(totalLabelsResult.rows[0].count);
    
    // Get today's labels count
    const todayLabelsQuery = `
      SELECT COUNT(*) as count
      FROM logistic_labels
      WHERE user_id = $1
      AND DATE(created_at) = CURRENT_DATE
    `;
    const todayLabelsResult = await db.query(todayLabelsQuery, [user.id]);
    const labelsToday = parseInt(todayLabelsResult.rows[0].count);
    
    // Get last label created date
    const lastLabelQuery = `
      SELECT created_at
      FROM logistic_labels
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 1
    `;
    const lastLabelResult = await db.query(lastLabelQuery, [user.id]);
    const lastLabelCreated = lastLabelResult.rows[0]?.created_at || null;
    
    // Get unique GTINs count
    const uniqueGtinsQuery = `
      SELECT COUNT(DISTINCT gtin) as count
      FROM logistic_labels
      WHERE user_id = $1
    `;
    const uniqueGtinsResult = await db.query(uniqueGtinsQuery, [user.id]);
    const uniqueGTINs = parseInt(uniqueGtinsResult.rows[0].count);
    
    // Get recent labels
    const recentLabelsQuery = `
      SELECT id, gtin, lot_number, created_at
      FROM logistic_labels
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 5
    `;
    const recentLabelsResult = await db.query(recentLabelsQuery, [user.id]);
    const recentLabels = recentLabelsResult.rows;
    
    return json({ 
      success: true,
      stats: {
        totalLabels,
        labelsToday,
        lastLabelCreated,
        uniqueGTINs
      },
      recentLabels
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    
    return json(
      { 
        success: false, 
        message: 'Failed to fetch dashboard data. Please try again.' 
      }, 
      { status: 500 }
    );
  }
}