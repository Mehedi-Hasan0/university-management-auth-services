import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse, IPaginationOptions } from '../../../types';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import mongoose from 'mongoose';

const createDepartment = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty',
  );

  return result;
};

const getAllDepartment = async (
  paginationOptions: IPaginationOptions,
  filters: IAcademicDepartmentFilters,
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whenConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicDepartment.find(whenConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');

  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>,
): Promise<IAcademicDepartment | null> => {
  const findCriteria = {
    _id: new mongoose.Types.ObjectId(id),
  };

  const result = await AcademicDepartment.findOneAndUpdate(
    findCriteria,
    payload,
    { new: true },
  ).populate('academicFaculty');

  return result;
};

const deleteDepartment = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);

  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
