import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // @ts-ignore
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING); // nếu báo lỗi thì ignore dòng này là lỗi type scrip checking
    console.log('Kết nối đến MongoDB thành công');
    } catch (error) {
    console.error('Kết nối đến MongoDB thất bại', error);
    process.exit(1); // thoát khỏi quá trình với mã lỗi 1
    }
};