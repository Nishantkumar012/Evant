import { Request, Response, NextFunction } from 'express';
import Requirement from '../models/Requirement';

export const createRequirement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const requirement = new Requirement(req.body);
    const savedRequirement = await requirement.save();

    res.status(201).json({
      success: true,
      data: savedRequirement,
    });
  } catch (error) {
    next(error);
  }
};

export const getRequirements = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, status, limit = 50, page = 1 } = req.query;

    const filter: any = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);

    const requirements = await Requirement.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(skip);

    const total = await Requirement.countDocuments(filter);

    res.json({
      success: true,
      data: requirements,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRequirementById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const requirement = await Requirement.findById(req.params.id);

    if (!requirement) {
      res.status(404).json({
        success: false,
        message: 'Requirement not found',
      });
      return;
    }

    res.json({
      success: true,
      data: requirement,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRequirement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const requirement = await Requirement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!requirement) {
      res.status(404).json({
        success: false,
        message: 'Requirement not found',
      });
      return;
    }

    res.json({
      success: true,
      data: requirement,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRequirement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const requirement = await Requirement.findByIdAndDelete(req.params.id);

    if (!requirement) {
      res.status(404).json({
        success: false,
        message: 'Requirement not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Requirement deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
