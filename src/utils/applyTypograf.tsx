import Typograf from "typograf"

const tp = new Typograf({ locale: ["ru", "en-US"] })

const applyTypograf = (input: string): string => {
  return tp.execute(input)
}

export default applyTypograf
