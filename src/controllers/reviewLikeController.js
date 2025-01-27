import { ReviewLikeService as Service } from '../services/reviewLikeService.js';
import errorCode from '../util/error.js'


export const ReviewLikeController = {
    updateLikeStatus: async (req, res) => {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json(...errorCode[401]); // errorCode 적용
        }
		console.log(userId)
        
        const { review_type: reviewType, review_id: reviewId, like } = req.body;
    
        try {
          await Service.updateLikeStatus({ reviewType, reviewId, like, userId });
    
          return res.status(200).json({
            code: 200,
            message: 'Review like status updated successfully.',
          });
        } catch (error) {
          console.error(error.message);
          return res.status(400).json({
            ...errorCode[400],
            detail: 'Failed to update review like status.',
          });
        }
      },
    };
