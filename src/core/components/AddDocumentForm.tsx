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
import { useMutation } from "@blitzjs/rpc"
import Editor from "../lexical/Editor"
import { useState } from "react"
import { useRouter } from "next/router"
import addDocument from "../mutations/addDocument"
import { Prisma } from "@prisma/client"

const AddActivityForm = () => {
  const [newDocument] = useMutation(addDocument)
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
            await newDocument({
              title: values.title,
              contents: description as Prisma.JsonObject,
            })
            await router.push("/")
            toast.custom(<ToastNotification role="status" kind="success" title="Added document!" />)
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
