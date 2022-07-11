import { DateHelper } from "../../../src/helpers/implementations/DateHelper"

describe("Date Helper", () => {
  const dateHelper = new DateHelper()
  it("should add seconds to a date", () => {
    const datePlusSeconds = dateHelper.nowPlusSeconds(60)
    expect(typeof datePlusSeconds).toBe("object")
  })
})
