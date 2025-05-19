import { motion } from "framer-motion";

function AnimationTitles({ title, text, className }) {
    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const spanVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
        },
    };

    const textLines = text.split(". ")

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
        >
            <h1 className={className}>
                {title.split("").map((char, index) => (
                    <motion.span variants={spanVariants} key={index}>
                        {char}
                    </motion.span>
                ))}
            </h1>
            <div className="mt-3 fs-5" style={{ color: "#c3c5ce", fontSize: "30px" }}>
                {textLines.map((line, lineIndex) => (
                    <p key={lineIndex}>
                        {line.split("").map((char, charIndex) => (
                            <motion.span 
                                variants={spanVariants} 
                                key={`${lineIndex}-${charIndex}`}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </p>
                ))}
            </div>
        </motion.div>
    );
}

export default AnimationTitles;