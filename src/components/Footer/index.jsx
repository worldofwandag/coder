import { useState, useEffect, useRef } from "react"
import "./style.css"
import BackgroundLines from "../BackgroundLines"
import ParaWriting from "../ParaWriting"
import { motion, useAnimation } from "framer-motion"
import ArrowUpRightIcon from "../../assets/Icon/arrow-up-right.svg"
import { useInView } from "react-intersection-observer"
import Button from "../Button"
import Time from "../Time"

// emailjs
import emailjs from "@emailjs/browser"

// JSON
import emailjsconfig from "../../constants/emailjs.json"
import Alert from "../Alert"

export default function Footer() {
  const controls = useAnimation()
  const [ref, inView] = useInView()
  const [isSending, setIsSending] = useState(false)
  const [sendStatus, setSendStatus] = useState({ processed: false, message: "", variant: "success" })
  const [hasAnimated, setHasAnimated] = useState(false)
  
  // Store actual form values
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: ""
  })
  
  // Track which fields have been interacted with (for animation)
  const [fieldInteracted, setFieldInteracted] = useState({
    name: false,
    email: false,
    message: false
  })

  const handleComplete = () => {
    setHasAnimated(true)
  }

  useEffect(() => {
    // Start animation when the component is in view
    if (inView && !hasAnimated) {
      controls.start("visible")
    }
  }, [inView, controls])

  const opacityVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const inputFieldLineVariant = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
    },
  }

  const inputFields = [
    {
      label: "Name",
      type: "text",
      id: "name",
      placeholder: "Enter name",
      stateKey: "name",
    },
    {
      label: "Email",
      type: "email",
      id: "email",
      placeholder: "hello@mail.com",
      stateKey: "email",
    },
    {
      label: "Message",
      type: "textarea",
      id: "message",
      placeholder: "Your message",
      rows: "8",
      wrap: "soft",
      stateKey: "message",
    },
  ]

  const handleInputChange = (stateKey, value) => {
    // Update both the interaction state and form values
    setFieldInteracted({
      ...fieldInteracted,
      [stateKey]: true,
    })
    
    setFormValues({
      ...formValues,
      [stateKey]: value
    })
  }

  const timeoutAlert = () =>
    setTimeout(() => {
      setSendStatus({ ...sendStatus, processed: false })
    }, 5000)

  const sendEmail = async () => {
    // Check if any fields are empty
    const requiredFields = ["name", "email", "message"]
    const missingFields = requiredFields.filter((field) => !formValues[field])

    if (missingFields.length > 0) {
      setSendStatus({ processed: true, variant: "error", message: "Not all fields were filled" })
      timeoutAlert()
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formValues.email)) {
      setSendStatus({ processed: true, variant: "error", message: "Invalid email" })
      timeoutAlert()
      return
    }

    setIsSending(true)
    try {
      const { serviceId, templateid, publicKey } = emailjsconfig

      const templateParams = {
        name: formValues.name,
        email: formValues.email,
        message: formValues.message,
      }

      // Initialize EmailJS if not already initialized
      if (!emailjs.init) {
        emailjs.init(publicKey)
      }

      const response = await emailjs.send(serviceId, templateid, templateParams, publicKey)

      console.log("Email sent successfully:", response)
      setIsSending(false)
      setSendStatus({ processed: true, variant: "success", message: "Success!" })
      
      // Clear form after successful submission
      setFormValues({
        name: "",
        email: "",
        message: ""
      })
    } catch (error) {
      console.error("Error sending email:", error)
      setIsSending(false)
      setSendStatus({ processed: true, variant: "error", message: "Error sending email" })
    }

    timeoutAlert()
  }

  return (
    <footer ref={ref} className="footer" id="contact">
      <BackgroundLines />

      <div className="footer--grid">
        <div className="footer--grid--heading">
          <h2>
            <ParaWriting stagger={0.08} text={"Get in "} sec={"touch"} />
          </h2>
        </div>
        <div className="footer--grid--form">
          {inputFields.map((field, index) => (
            <motion.div key={index} initial="hidden" animate={controls} variants={opacityVariant} transition={{ duration: 1, delay: 0.5 * (index + 1) }} className="input--div">
              <label htmlFor={field.id}>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea 
                  name={field.id} 
                  id={field.id} 
                  placeholder={field.placeholder} 
                  rows={field.rows} 
                  wrap={field.wrap} 
                  value={formValues[field.stateKey]}
                  onChange={(e) => handleInputChange(field.stateKey, e.target.value)}
                />
              ) : (
                <input 
                  type={field.type} 
                  name={field.id} 
                  id={field.id} 
                  placeholder={field.placeholder} 
                  value={formValues[field.stateKey]}
                  onChange={(e) => handleInputChange(field.stateKey, e.target.value)}
                />
              )}
              <motion.div
                initial="hidden"
                animate={controls}
                variants={inputFieldLineVariant}
                transition={{
                  type: "spring",
                  stiffness: 20,
                  duration: 1,
                  delay: 0.5 * (index + 1),
                }}
                className="input--div--line"
              >
                <motion.div
                  initial="hidden"
                  animate={fieldInteracted[field.stateKey] && "visible"}
                  variants={inputFieldLineVariant}
                  transition={{
                    type: "spring",
                    stiffness: 20,
                    duration: 1,
                  }}
                ></motion.div>
              </motion.div>
            </motion.div>
          ))}
          <motion.div initial="hidden" animate={controls} variants={opacityVariant} transition={{ duration: 1, delay: 2 }} className="footer--grid--form--btn">
            <Button label={`${isSending ? "Sending it through" : "SEND MESSAGE"}`} icon={ArrowUpRightIcon} onClick={sendEmail} />
          </motion.div>
        </div>
      </div>

      <motion.div initial="hidden" animate={controls} variants={opacityVariant} transition={{ duration: 1, delay: 2.5 }} className="footer--bottom" onAnimationComplete={() => handleComplete()}>
        <p>Copyright © {new Date().getFullYear()} Jonathan Wandag</p>
        <p>
          <a href="#">Back to Top</a>
        </p>
        <p>
          <Time delay={3} />
        </p>
        <p></p>
      </motion.div>
      <Alert isVisible={sendStatus.processed} text={sendStatus.message} variant={sendStatus.variant} />
    </footer>
  )
}