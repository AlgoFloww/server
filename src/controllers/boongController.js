import { fetchNearbyStores } from '../services/boongService.js'
import {
	getStoreDetails,
	getStoreMenu,
	getStorePhotos,
	getStoreReviews,
} from '../models/storeModel.js'
import errorCode from '../util/error.js'

export const getNearbyStores = async (req, res) => {
	const { lat, lng } = req.body;
	const { count, sort } = req.query; // 정렬 방식과 불러올 매장 수
	console.log('req.query:', req.query);

	// lat, lng 유효성 검사
	if (!lat || !lng || isNaN(parseFloat(lat)) || isNaN(parseFloat(lng))) {
		return res.status(400).json({
			...errorCode[400],
			msg: '모든 좌표를 올바른 형식으로 입력해주세요.',
		});
	}

	// count가 숫자인지 확인
	const storeCount = count && !isNaN(Number(count)) ? Number(count) : 5; // 기본값 5

	// sort가 all 또는 popular인지 확인, 기본값은 'all' (가까운 거리 순)
	const sortOrder = sort === 'popular' ? 'ORDER BY heart_count DESC' : 'ORDER BY distance ASC';

	try {
		// fetchNearbyStores 호출 시, lat과 lng만 전달
		const stores = await fetchNearbyStores(
			parseFloat(lat),
			parseFloat(lng),
			5, // 반경 5km
			storeCount,
			sortOrder
		);

		// 성공적인 응답 반환
		res.status(200).json({
			code: 200,
			msg: '통신 성공',
			count: stores.length,
			data: stores,
		});
	} catch (error) {
		console.error('컨트롤러 오류:', error);
		res.status(500).json(
			...errorCode[500]
		);

	}
};


export const getStoreInfo = async (req, res) => {
	const { store_id } = req.params;  // store_id는 URL 파라미터로 받음
	const { tab, sort, filter } = req.query;  // tab은 기본값 'menu'로 설정

	// storeid가 없는 경우 처리
	if (!store_id) {
		return res.status(400).json({
			...errorCode[400],
			detail: 'storeid는 필수입니다.',
		});
	}

	// tab 값 검증 (menu, photo, reviews 중 하나여야 함)
	const validTabs = ['menu', 'photo', 'reviews'];
	try {
		let data;

		// tab이 없을 경우 getStoreDetails 호출
		if (!tab) {
			data = await getStoreDetails(store_id);  // storeid에 대한 상세 정보를 가져옴
		} else if (validTabs.includes(tab)) {
			// tab 값이 menu, photo, reviews일 경우에만 해당 함수 호출
			switch (tab) {
				case 'menu':
					data = await getStoreMenu(store_id);  // 메뉴 데이터를 가져옴
					break;
				case 'photo':
					data = await getStorePhotos(store_id, filter);  // 사진 데이터를 가져옴
					break;
				case 'reviews':
					data = await getStoreReviews(store_id, sort);  // 리뷰 데이터를 가져옴
					break;
			}
		} else {
			// 잘못된 tab 값 처리
			return res.status(400).json({
				...errorCode[400],
				detail: '잘못된 tab 값입니다. 유효한 값은 menu, photo, reviews 입니다.',
			});
		}
		
		// 응답 반환
		res.status(200).json({
			code: 200,
			message: '성공',
			data: data[0],
		});
	} catch (error) {
		res.status(500).json({
			...errorCode[500],
			detail: `서버 오류: ${error.message}`,
		});
	}
};
