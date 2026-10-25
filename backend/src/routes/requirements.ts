import express from 'express';
import {
  createRequirement,
  getRequirements,
  getRequirementById,
  updateRequirement,
  deleteRequirement,
} from '../controllers/requirementController';
import { requirementSchema } from '../middleware/validation';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const validatedData = requirementSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    next(error);
  }
}, createRequirement);

router.get('/', getRequirements);
router.get('/:id', getRequirementById);
router.patch('/:id', updateRequirement);
router.delete('/:id', deleteRequirement);

export default router;
