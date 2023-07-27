import {
  TextInput,
  Button,
  Stack,
  DatePicker,
  DatePickerInput,
  ToastNotification,
} from "carbon-components-react"
import { Form as FinalForm, Field } from "react-final-form"
import toast from "react-hot-toast"
import addActivity from "../mutations/addActivity"
import { useMutation } from "@blitzjs/rpc"
import Editor from "../lexical/Editor"
import { useState } from "react"
import { useRouter } from "next/router"

const AddActivityForm = () => {
  const [newActivity] = useMutation(addActivity)
  const [description, setDescription] = useState({})
  const [submit, setSubmit] = useState(false)
  const router = useRouter()

  return (
    <FinalForm
      onSubmit={async (values) => {
        // Not using toast.promise because hard to customise
        // https://github.com/timolins/react-hot-toast/issues/147
        try {
          if (submit) {
            await newActivity({
              title: values.title,
              description,
              startDate: values.startAndEndDates[0] || null,
              endDate: values.startAndEndDates[1] || null,
              location: values.location || null,
            })
            await router.push("/")
            toast.custom(<ToastNotification role="status" kind="success" title="Added activity!" />)
            setSubmit(false)
          }
        } catch (e) {
          toast.custom(
            <ToastNotification role="status" kind="error" title={`Failed because ${e.message}`} />
          )
        }
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Stack gap={7}>
            <Field name="title">
              {(props) => (
                <>
                  <TextInput
                    id="title"
                    helperText="At most 50 characters, please. This helps keep it easy to understand."
                    required
                    invalidText="Invalid error message."
                    labelText="What happened?"
                    placeholder="Provide a descriptive title for this activity."
                    {...props.input}
                  />
                </>
              )}
            </Field>
            <Editor
              onChange={(editorState) => {
                setDescription(editorState)
              }}
            />
            <Field name="location">
              {(props) => (
                <>
                  <TextInput
                    id="location"
                    helperText={
                      <>
                        Use{" "}
                        <a href="https://what3words.com/" target="_blank" rel="noreferrer">
                          https://what3words.com/
                        </a>{" "}
                        to find your location info
                      </>
                    }
                    invalidText="Invalid error message."
                    labelText="Where did it happen?"
                    placeholder="Optional location information."
                    {...props.input}
                  />
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

            <Button
              type="submit"
              onClick={() => {
                setSubmit(true)
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      )}
    />
  )
}

export default AddActivityForm
