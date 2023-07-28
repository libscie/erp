import {
  TextInput,
  NumberInput,
  Button,
  Stack,
  DatePicker,
  DatePickerInput,
  ToastNotification,
} from "carbon-components-react"
import { Form as FinalForm, Field } from "react-final-form"
import toast from "react-hot-toast"
import addActivity from "../mutations/addActivity"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Editor from "../lexical/Editor"
import { useState } from "react"
import { useRouter } from "next/router"
import { ButtonSet, Dropdown, Heading, Search } from "@carbon/react"
import addBudget from "../mutations/addBudget"
import { Decimal } from "@prisma/client/runtime"
import getBudgetOptions from "../queries/getBudgetOptions"

const AddBudgetForm = () => {
  const [newBudget] = useMutation(addBudget)
  const [budgetOpts] = useQuery(getBudgetOptions, null)
  const [description, setDescription] = useState({})
  const [submit, setSubmit] = useState(false)
  const [parentId, setParent] = useState(undefined as undefined | number)
  const [lineItems, setLineItems] = useState([{ title: "", value: 0, emissions: 0 }])
  const [totalBudget, setTotalBudget] = useState(0)
  const [totalEmissions, setTotalEmissions] = useState(0)
  const router = useRouter()

  return (
    <FinalForm
      onSubmit={async (values) => {
        alert(JSON.stringify(values))
        // Not using toast.promise because hard to customise
        // https://github.com/timolins/react-hot-toast/issues/147
        try {
          if (submit) {
            // alert(JSON.stringify(lineItems))
            await newBudget({
              title: values.title,
              startDate: values.startAndEndDates[0],
              endDate: values.startAndEndDates[1],
              lineItems: lineItems.map((item) => {
                return item.title
              }),
              lineValues: lineItems.map((item) => {
                return item.value.toString()
              }),
              lineEmissions: lineItems.map((item) => {
                return item.emissions.toString()
              }),
              parentId,
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
          <Stack orientation="horizontal">
            <Heading>Total: {totalBudget}</Heading>
          </Stack>
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
            {lineItems.map((lineItem, index, max) => {
              return (
                <Stack orientation="horizontal" key={index}>
                  <TextInput
                    id="title"
                    helperText="At most 50 characters, please. This helps keep it easy to understand."
                    required
                    invalidText="Invalid error message."
                    // labelText={`Line item: ${index}`}
                    placeholder="Provide a descriptive title for this activity."
                    onChange={(value) => {
                      let newLines = lineItems
                      newLines[index]!.title = value.target.value

                      setLineItems(newLines)
                    }}
                  />
                  <NumberInput
                    id="title"
                    helperText="At most 50 characters, please. This helps keep it easy to understand."
                    required
                    invalidText="Invalid error message."
                    labelText="What happeneddfsaf?"
                    onChange={(value) => {
                      let newLines = lineItems
                      newLines[index]!.value = value.target.value

                      setLineItems(newLines)
                    }}
                  />
                  <NumberInput
                    id="title"
                    helperText="At most 50 characters, please. This helps keep it easy to understand."
                    required
                    invalidText="Invalid error message."
                    labelText="What happened?"
                    onChange={(value) => {
                      let newLines = lineItems
                      newLines[index]!.emissions = value.target.value

                      setLineItems(newLines)
                    }}
                  />
                </Stack>
              )
            })}
            <ButtonSet>
              <Button
                onClick={() => {
                  const newLines = lineItems.concat({ title: "", value: 0, emissions: 0 })
                  setLineItems(newLines)
                }}
                kind="primary"
              >
                Add line item
              </Button>
              <Button
                onClick={() => {
                  const newLines = lineItems.slice(0, -1)
                  setLineItems(newLines)
                }}
                disabled={lineItems.length === 1}
                kind="secondary"
              >
                Remove last line
              </Button>
            </ButtonSet>
            {/* <Search labelText={undefined} /> */}
            <Dropdown
              id="default"
              titleText="Dropdown label"
              helperText="This is some helper text"
              label="Dropdown menu options"
              items={budgetOpts}
              itemToString={(budgetOpts) => (budgetOpts ? budgetOpts.text : "")}
              onChange={(values) => {
                setParent(parseInt(values.selectedItem!.id!))
              }}
            />
            {/* <Select id="select-1" labelText="Select an option" helperText="Optional helper text">
        <SelectItem value="" text="" />
        <SelectItem value="option-1" text="Option 1" />
        <SelectItem value="option-2" text="Option 2" />
        <SelectItem value="option-3" text="Option 3" />
        <SelectItem value="option-4" text="Option 4" />
      </Select> */}
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

export default AddBudgetForm
