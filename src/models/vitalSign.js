export default class VitalSign {
  constructor () {
    this.HR = '---'
    this.SPO2 = '---'
    this.MAP = '---'
    this.TEMP1 = '--.-'
    this.TEMP2 = '--.-'
    this.DBP = '---'
    this.PULSE = '---'
    this.SBP = '---'
    this.RESP = '--'
  }

  update (obj) {
    if (!obj) {
      obj = {}
    }
    ({
      heartRate: this.HR = '---',
      patBloodOxygen: this.SPO2 = '---',
      patBloodPressure: this.MAP = '---',
      patBodyTemperature: this.TEMP1 = '--.-',
      patDiastolicPressure: this.DBP = '---',
      patSphygmus: this.PULSE = '---',
      patSystolicPressure: this.SBP = '---',
      patRespiration: this.RESP = '--'
    } = obj)
  }
}
