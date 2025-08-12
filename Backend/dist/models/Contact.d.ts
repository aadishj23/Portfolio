import mongoose, { Document } from 'mongoose';
export interface IContact extends Document {
    email: string;
    message: string;
    createdAt: Date;
}
declare const _default: mongoose.Model<IContact, {}, {}, {}, mongoose.Document<unknown, {}, IContact, {}, {}> & IContact & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Contact.d.ts.map