FROM quay.io/darling237221/bot:beta
RUN git clone https://github.com/darling237221/ASENA_MD.git /root/LyFE/
RUN mv /root/bottus/* /root/LyFE/
WORKDIR /root/LyFE/
CMD ["node", "bot.js"]
