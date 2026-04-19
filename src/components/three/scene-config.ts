export interface ParticleConfig {
  count:  number
  color:  string
  size:   number
  speed:  number
}

export const defaultConfig: ParticleConfig = {
  count: 120,
  color: '#FF5757',
  size:  0.025,
  speed: 0.0002,
}

export const heroConfig: ParticleConfig = {
  ...defaultConfig,
  count: 80,
  speed: 0.00015,
}
