import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Sender ID is required"],
            index: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Receiver ID is required"],
            index: true
        },
        text: {
            type: String,
            trim: true,
            validate: {
                validator: function(v) {
                    // Either text or image must be present
                    return this.image || v;
                },
                message: 'Message must contain either text or image'
            }
        },
        image: {
            type: String,
            trim: true
        },
        status: {
            type: String,
            enum: ['sent', 'delivered', 'read'],
            default: 'sent'
        }
    },
    { 
        timestamps: true,
    }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;