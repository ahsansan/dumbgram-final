const { Op } = require("sequelize");
const { tbMessage, tbUser } = require("../../models");
const jwt = require("jsonwebtoken");

const connectedUser = {};

const socketIo = (io) => {
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      next();
    } else {
      next(new Error("Not Authorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("user connected");

    const userId = socket.handshake.query.id;
    connectedUser[userId] = socket.id;

    socket.on("load contacts", async () => {
      try {
        let customerContacts = await tbUser.findAll({
          include: [
            {
              model: tbMessage,
              as: "receiverMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
              },
            },
            {
              model: tbMessage,
              as: "senderMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        });

        customerContacts = JSON.parse(JSON.stringify(customerContacts));
        customerContacts = customerContacts.map((item) => ({
          ...item,
          image: process.env.UPLOAD_PATH + item.image,
        }));

        // console.log("customer contact", customerContacts);

        let chatNya = [];
        for (let index = 0; index < customerContacts.length; index++) {
          const dataChat = customerContacts[index];
          if (
            dataChat.receiverMessage.length == 0 &&
            dataChat.senderMessage.length == 0
          ) {
          } else {
            chatNya.push(dataChat);
          }
        }
        socket.emit("contacts", chatNya);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("load messages", async (payload) => {
      try {
        const token = socket.handshake.auth.token;

        const tokenKey = process.env.SECRET_KEY;
        const verified = jwt.verify(token, tokenKey);

        const idReceiver = payload;
        const idSender = verified.id;

        const data = await tbMessage.findAll({
          where: {
            idSender: {
              [Op.or]: [idReceiver, idSender],
            },
            idReceiver: {
              [Op.or]: [idReceiver, idSender],
            },
          },
          include: [
            {
              model: tbUser,
              as: "receiver",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
            {
              model: tbUser,
              as: "sender",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
          ],
          order: [["createdAt", "ASC"]],
          attributes: {
            exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
          },
        });

        socket.emit("messages", data);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("send message", async (payload) => {
      try {
        const token = socket.handshake.auth.token;

        const tokenKey = process.env.SECRET_KEY;
        const verified = jwt.verify(token, tokenKey);

        const idSender = verified.id;

        const { idReceiver, message } = payload;

        await tbMessage.create({
          message,
          idReceiver,
          idSender,
        });

        io.to(socket.id)
          .to(connectedUser[idReceiver])
          .emit("new message", idReceiver);
      } catch (err) {}
    });

    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });
};

module.exports = socketIo;
