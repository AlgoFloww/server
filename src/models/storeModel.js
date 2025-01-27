import { getDB } from '../database/connection.js'

// 매장 상세 정보 조회
export const getStoreDetails = async (storeid) => {
    //const query = 'SELECT * FROM Stores WHERE store_id = ?';
    const query = `
    SELECT 
        s.store_id,
        s.store_name,
        s.address,
        s.heart_count,
        s.heart_status,
        s.is_order_online,
        s.latitude, s.longitude,
        sd.*
    FROM stores s # 소문자  
    JOIN store_details sd ON s.store_id = sd.store_id
    WHERE s.store_id = ?;
`;
    const connection = await getDB();
    const [rows] = await connection.execute(query, [storeid]);

    //return result1;
    // 변환: is_order_online 값이 0이면 false, 1이면 true
    const formattedRows = rows.map(row => ({
        ...row,
        is_order_online: row.is_order_online === 1,
        heart_status: row.heart_status === 1,
    }));

    return formattedRows;
};

// 매장 메뉴 정보 조회
export const getStoreMenu = async (storeid) => {
    const query = 'SELECT * FROM menu WHERE store_id = ?';
    const connection = await getDB();
    //const result2 = await connection.execute(query, [storeid]);
    const rows = await connection.execute(query, [storeid]);

    // store_id 필드 제거
    const result2 = rows.map(({ store_id, ...rest }) => rest);
    return result2;
};

// 매장 사진 정보 조회
export const getStorePhotos = async (storeid, filter) => {
	let query = 'SELECT * FROM photos WHERE store_id = ?'
	const params = [storeid]

	if (filter) {
		query += ' AND photo_category = ?'
		params.push(filter)
	}
	if (filter) {
		query += ' AND photo_category = ?'
		params.push(filter)
	}

	const connection = await getDB()
	const result3 = await connection.execute(query, params)
	return result3
}

// 매장 리뷰 정보 조회
// users 테이블과 조인하여 닉네임을 포함한 리뷰 데이터를 가져오도록
export const getStoreReviews = async (storeid, sort) => {
	let query = `
        SELECT 
            sr.*,
            u.nickname
        FROM 
            store_reviews sr
        JOIN 
            users u
        ON 
            sr.user_id = u.id
        WHERE 
            sr.store_id = ?
    `
	const params = [storeid]
    
	if (sort === 'latest') {
		query += ' ORDER BY sr.review_date DESC'
	} else if (sort === 'popular') {
		query += ' ORDER BY sr.review_heart DESC'
	}

    const connection = await getDB();
    const result4 = await connection.execute(query, params);

	return result4
}