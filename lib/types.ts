export interface NailShape {
  id: string
  name: string
  icon: string
}

export interface NailColor {
  id: string
  name: string
  hex: string
  type: "solid" | "glitter" | "pearl" | "matte"
}
