import { motion } from 'framer-motion'
function Loader() {
    return <>
      <div className="loader_container">
  <div className="loader_box">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      className="spinner"
    />
    <p>Loading, please wait...</p>
  </div>
</div>
    </>
}

export default Loader