import qrcode
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)



for i in range(0, 20):
    # add data to the qr code with i + 1 as the f parameter
    qr.add_data('https://rodjuncode.github.io/flux?f=' + str(i+1))
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    # save the image in a png file
    img.save(f"assets/qr/qr{i+1}.png")
    qr.clear()
