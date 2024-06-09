import React from 'react'

function Footer() {
    return (
        <div className="w-100 h-50 bg-dark py-5 px-5">
            <div className="container border-bottom">
                <ul className="d-flex w-100 justify-content-center flex-wrap flex-sm-row">
                    <li className="pe-auto list-group-item my-2 px-4"><a href="facebook.com"><i className="fs-5 text-white fa-brands fa-facebook"></i></a></li>
                    <li className="pe-auto list-group-item my-2 px-4"><a href="github.com/duytnh"><i className="fs-5 text-white fa-brands fa-github"></i></a></li>
                    <li className="pe-auto list-group-item my-2 px-4"><a href="x.com"><i className="fs-5 text-white fa-brands fa-twitter"></i></a></li>
                </ul>
            </div>

            <h4 className="text-center my-4 text-white">
                Facebook Fake
            </h4>

            <div className="w-100 d-flex flex-wrap justify-content-between">

                <div className="m-2 flex-item" style={{ width: '20rem' }}>
                    <h4 className="heading" style={{ color: 'blue' }}>Help</h4>
                    <div className="content">
                        <ul className="px-0">
                            <li className="my-2 list-group-item"><p className="text-white text-decoration-none my-2">Đây là trang facebook fake nhe mọi người. Có một số tính năng tương tự facebook và giao diện có một số nơi cũng giống nhưng nó không phải facebook real. Tại đây bạn chỉ có thể upload ảnh, like, comment, xem trang cá nhân, chỉnh sửa, thay đổi mật khẩu và nhiều tính năng khác chờ bạn khám phá.</p></li>
                        </ul>
                    </div>
                </div>

                <div className="m-2 flex-item">
                    <h4 className="heading" style={{ color: 'blue' }}>Products</h4>
                    <div className="content">
                        <ul className="px-0">
                            <li className="my-2 list-group-item"><p className="text-white text-decoration-none my-2">HTML</p></li>
                            <li className="my-2 list-group-item"><p className="text-white text-decoration-none my-2">CSS</p></li>
                            <li className="my-2 list-group-item"><p className="text-white text-decoration-none my-2">JavaScript</p></li>
                            <li className="my-2 list-group-item"><p className="text-white text-decoration-none my-2">PHP</p></li>
                            <li className="my-2 list-group-item"><p className="text-white text-decoration-none my-2">ReactJS</p></li>
                        </ul>
                    </div>
                </div>

                <div className="m-2 flex-item">
                    <h4 className="heading" style={{ color: 'blue' }}>Useful Links</h4>
                    <div className="content">
                        <ul className="px-0">
                            <li className="my-2 list-group-item"><p className="text-white text-decoration-none my-2">Help</p></li>
                            <li className="my-2 list-group-item"><p className="text-white text-decoration-none my-2">Pricing</p></li>
                            <li className="my-2 list-group-item"><p className="text-white text-decoration-none my-2">Settings</p></li>
                            <li className="my-2 list-group-item"><p className="text-white text-decoration-none my-2">Order Details</p></li>
                        </ul>
                    </div>
                </div>

                <div className="m-2 flex-item">
                    <h4 className="heading" style={{ color: 'blue' }}>Contact Us</h4>
                    <div className="content">
                        <ul className="px-0">
                            <li className="my-2 list-group-item"><p className="text-white text-decoration-none my-2">Mỹ Lợi A, Cái Bè - Tiền Giang</p></li>
                            <li className="my-2 list-group-item"><p className="text-white text-decoration-none my-2">duytnh201@gmial.com</p></li>
                            <li className="my-2 list-group-item"><p className="text-white text-decoration-none my-2">0964896483</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer
