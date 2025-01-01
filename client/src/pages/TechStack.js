import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";

const PARTNER_LOGOS = [
    { src: "htmlcssjs.png", height: "75px" },
    { src: "react.png" },
    { src: "nodejs.png", height: "55px" },
    { src: "mongodb.png", height: "55px" },
    { src: "C++.png" },
];

const BREAKPOINTS = {
    0: { slidesPerView: 2 },
    520: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    992: { slidesPerView: 5 },
    1198: { slidesPerView: 5 },
};

function Partners() {
    return (
        // Start partner
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="partners"
        >
            <span></span>
            <Container className="d-flex align-items-center flex-nowrap overflow-hidden py-5">
                <Swiper
                    className="mySwiper"
                    loop={true}
                    grabCursor={true}
                    breakpoints={BREAKPOINTS}
                >
                    {PARTNER_LOGOS.map(({ src, height }, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={require(`../images/partners/${src}`)}
                                alt={`Partner logo ${index + 1}`}
                                style={height ? { height } : undefined}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </motion.div>
        // End partners
    );
}

export default Partners;
