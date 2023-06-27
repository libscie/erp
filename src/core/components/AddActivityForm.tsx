import {
  Form,
  TextInput,
  TextArea,
  Select,
  SelectItem,
  Button,
  Stack,
  ModalWrapper,
  DatePicker,
  DatePickerInput,
} from "@carbon/react"
import { Form as FinalForm, Field } from "react-final-form"

const AddActivityForm = () => {
  return (
    <FinalForm
      onSubmit={(values) => {
        console.log(values)
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Stack gap={7}>
            <Field name="title">
              {(props) => (
                <>
                  <TextInput
                    id="123"
                    helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
                    invalidText="Invalid error message."
                    labelText="Activity title"
                    placeholder="Optional placeholder text"
                    {...props.input}
                  />
                </>
              )}
            </Field>
            <Field name="description">
              {(props) => (
                <>
                  <TextArea
                    cols={50}
                    helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
                    id="description"
                    invalidText="Invalid error message."
                    labelText="Text area label"
                    placeholder="Optional placeholder text"
                    rows={4}
                    {...props.input}
                  />
                </>
              )}
            </Field>
            <Field name="activityType">
              {(props) => (
                <>
                  <Select
                    defaultValue="placeholder-item"
                    id="select-1"
                    invalidText="This is an invalid error message."
                    labelText="Select"
                    {...props.input}
                  >
                    <SelectItem text="Option 1" value="option-1" />
                    <SelectItem text="Option 2" value="option-2" />
                    <SelectItem text="Option 3" value="option-3" />
                  </Select>
                </>
              )}
            </Field>
            <Field name="startAndEndDates">
              {(props) => (
                <>
                  <DatePicker
                    datePickerType="range"
                    allowInput={undefined}
                    appendTo={undefined}
                    className={undefined}
                    closeOnSelect={undefined}
                    inline={undefined}
                    invalid={undefined}
                    invalidText={undefined}
                    light={false}
                    warnText={undefined}
                    {...props.input}
                  >
                    <DatePickerInput
                      id="date-picker-input-id-start"
                      placeholder="mm/dd/yyyy"
                      labelText="Start date"
                      size="md"
                    />
                    <DatePickerInput
                      id="date-picker-input-id-finish"
                      placeholder="mm/dd/yyyy"
                      labelText="End date"
                      size="md"
                    />
                  </DatePicker>
                </>
              )}
            </Field>

            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      )}
    />
  )
}

export default AddActivityForm
