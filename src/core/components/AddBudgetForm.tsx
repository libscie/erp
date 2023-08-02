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
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useState } from "react"
import { useRouter } from "next/router"
import { ButtonSet, Dropdown, Heading, Section } from "@carbon/react"
import addBudget from "../mutations/addBudget"
import getBudgetOptions from "../queries/getBudgetOptions"

const AddBudgetForm = () => {
  const [newBudget] = useMutation(addBudget)
  const [budgetOpts] = useQuery(getBudgetOptions, null)
  const [submit, setSubmit] = useState(false)
  const [parentId, setParent] = useState(undefined as undefined | number)
  const [lineItems, setLineItems] = useState([{ title: "", value: 0, emissions: 0 }])
  const [totalBudget, setTotalBudget] = useState(0)
  const [totalEmissions, setTotalEmissions] = useState(0)
  const router = useRouter()

  return (
    <FinalForm
      onSubmit={async (values) => {
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
              totalValue: totalBudget,
              totalEmissions,
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
            <Heading>Add new budget</Heading>
          </Stack>
          <Stack gap={7}>
            <Field name="title">
              {(props) => (
                <>
                  <TextInput
                    id="title"
                    helperText="Keep this short and sweet. Acronyms need to be spelled out."
                    required
                    invalidText="Invalid error message."
                    labelText="What is the budget title?"
                    placeholder="Provide a descriptive title for your budget."
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
                    helperText="Add line item description."
                    required
                    invalidText="Invalid error message."
                    // labelText={`Line item: ${index}`}
                    placeholder="Lodging (12 nights)"
                    onChange={(value) => {
                      let newLines = lineItems
                      newLines[index]!.title = value.target.value

                      setLineItems(newLines)
                    }}
                  />
                  <NumberInput
                    id="title"
                    helperText="Add estimated cost in euro's."
                    required
                    invalidText="Invalid error message."
                    labelText="Add line item cost"
                    onChange={(value) => {
                      let newLines = lineItems
                      newLines[index]!.value = value.target.value

                      setTotalBudget(
                        newLines.reduce(
                          (partialSum, a) => partialSum + parseInt(a.value.toString()),
                          0
                        )
                      )
                      setLineItems(newLines)
                    }}
                  />
                  <NumberInput
                    id="title"
                    helperText="Add estimated emissions in kilogram."
                    required
                    invalidText="Invalid error message."
                    labelText="Add line item emission estimate"
                    onChange={(value) => {
                      let newLines = lineItems
                      newLines[index]!.emissions = value.target.value
                      setTotalEmissions(
                        newLines.reduce(
                          (partialSum, a) => partialSum + parseInt(a.emissions.toString()),
                          0
                        )
                      )
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
              titleText="Parent budget"
              helperText="If this is a part of another, already existing budget, link it here."
              label="Dropdown menu options"
              items={budgetOpts}
              itemToString={(budgetOpts) => (budgetOpts ? budgetOpts.text : "")}
              onChange={(values) => {
                setParent(parseInt(values.selectedItem!.id!))
              }}
            />
            <Section>
              <Section>Total value: €{totalBudget}</Section>
              <Section>Total emissions: {totalEmissions}kg Co2</Section>
            </Section>
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
