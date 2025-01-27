import { Router } from 'express';
import { getUserInfo, updateUserInfo, getUserReview, updateUserReview, deleteUserReview, deleteAccount} from '../controllers/mypageController.js';
import { getOrders } from '../controllers/boongOrderController.js'
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router()

// 사용자 정보 조회
router.get('/info', authenticateToken, getUserInfo)

// 사용자 정보 수정
router.patch('/info', authenticateToken, updateUserInfo);

// 사용자 정보 삭제
router.delete('/delete', authenticateToken, deleteAccount);

// 전체 리뷰 조회
router.get('/reviews/:tab', authenticateToken, getUserReview);

// 리뷰 아이디에 따른 리뷰 조회
router.get('/reviews/:tab/:reviewId', authenticateToken, getUserReview);

// 리뷰 수정
router.put('/reviews/:tab/:reviewId', authenticateToken, updateUserReview);

// 리뷰 삭제
router.delete('/reviews/:tab/:reviewId', authenticateToken, deleteUserReview);

// 주문 내역 보기
router.get('/order', authenticateToken, getOrders);

export default router