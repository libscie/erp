import {
  TextInput,
  NumberInput,
  Button,
  Stack,
  DatePicker,
  DatePickerInput,
  ToastNotification,
  Select,
  SelectItem,
} from "carbon-components-react"
import { Form as FinalForm } from "react-final-form"
import toast from "react-hot-toast"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useState } from "react"
import { useRouter } from "next/router"
import { ButtonSet, Dropdown, Heading, Section } from "@carbon/react"
import getBudgetOptions from "../queries/getBudgetOptions"
import addTransactions from "../mutations/addTransactions"

const AddTransactionsForm = () => {
  const [submit, setSubmit] = useState(false)
  const [addTransactionsMutation] = useMutation(addTransactions)
  const [budgetOpts] = useQuery(getBudgetOptions, null)
  const [transactions, setTransactions] = useState([
    {
      transactionDate: undefined,
      summary: undefined,
      value: undefined,
      vat: 19,
      netValue: undefined,
      account: "CREDIT",
      emissions: undefined,
      scope: "SCOPE3",
      budgetId: undefined,
    },
  ])
  const router = useRouter()

  return (
    <FinalForm
      onSubmit={async (values) => {
        // Not using toast.promise because hard to customise
        // https://github.com/timolins/react-hot-toast/issues/147
        try {
          if (submit) {
            alert(JSON.stringify(transactions))
            await addTransactionsMutation(transactions)
            await router.push("/")
            toast.custom(
              <ToastNotification role="status" kind="success" title="Added transactions!" />
            )
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
            <Heading>Add new transactions</Heading>
          </Stack>
          <Stack gap={7}>
            {transactions.map((lineItem, index, max) => {
              return (
                <Stack key={index}>
                  <Stack orientation="horizontal">
                    <TextInput
                      id="title"
                      helperText="Add line item description."
                      required
                      invalidText="Invalid error message."
                      labelText={`Line item: ${index}`}
                      hideLabel={true}
                      placeholder="Lodging (12 nights)"
                      onChange={(value) => {
                        let newLines = transactions
                        newLines[index]!.summary = value.target.value
                        setTransactions(newLines)
                      }}
                    />
                    <Dropdown
                      id="default"
                      titleText="Parent budget"
                      helperText="Link the related budget"
                      hideLabel={true}
                      label="Dropdown menu options"
                      items={budgetOpts}
                      itemToString={(budgetOpts) => (budgetOpts ? budgetOpts.text : "")}
                      onChange={(values) => {
                        console.log(values.selectedItem!.id)
                        let newLines = transactions
                        newLines[index]!.budgetId = values.selectedItem!.id as any
                        setTransactions(newLines)
                      }}
                    />
                  </Stack>
                  <Stack orientation="horizontal">
                    <Select
                      id={`select-1`}
                      labelText="Select an option"
                      hideLabel={true}
                      helperText="Debit is income, credit is spend."
                      onChange={(value) => {
                        let newLines = transactions
                        newLines[index]!.account = value.target.value
                        setTransactions(newLines)
                      }}
                    >
                      <SelectItem value="CREDIT" text="CREDIT" />
                      <SelectItem value="DEBIT" text="DEBIT" />
                    </Select>
                    <DatePicker
                      datePickerType="single"
                      onChange={(value) => {
                        let newLines = transactions
                        newLines[index]!.transactionDate = value[0].toISOString()
                        setTransactions(newLines)
                      }}
                    >
                      <DatePickerInput
                        placeholder="mm/dd/yyyy"
                        labelText="Date Picker label"
                        hideLabel={true}
                        id="date-picker-single"
                        helperText="Leave date clear for future transactions."
                        size="md"
                      />
                    </DatePicker>

                    <NumberInput
                      placeholder="120.32"
                      id="title"
                      helperText="Add cost in euro's."
                      required
                      invalidText="Invalid error message."
                      labelText="Transaction in euro's"
                      hideSteppers={true}
                      onChange={(value) => {
                        let newLines = transactions
                        newLines[index]!.value = value.target.value
                        setTransactions(newLines)
                      }}
                    />
                    <Select
                      id={`select-vat`}
                      labelText="Select VAT"
                      hideLabel={true}
                      helperText="VAT rate"
                      onChange={(value) => {
                        let newLines = transactions
                        newLines[index]!.vat = parseInt(value.target.value)

                        setTransactions(newLines)
                      }}
                    >
                      <SelectItem value={19} text="19%" />
                      <SelectItem value={16} text="16%" />
                      <SelectItem value={7} text="7%" />
                      <SelectItem value={0} text="0%" />
                    </Select>
                    <NumberInput
                      id="title"
                      helperText="Add estimated emissions in kilogram."
                      required
                      invalidText="Invalid error message."
                      labelText="Add line item emission estimate"
                      hideSteppers={true}
                      onChange={(value) => {
                        let newLines = transactions
                        newLines[index]!.emissions = value.target.value

                        setTransactions(newLines)
                      }}
                    />
                    <Select
                      id={`select-scope`}
                      labelText="Select Scope"
                      hideLabel={true}
                      helperText="Scope selection"
                      onChange={(value) => {
                        let newLines = transactions
                        newLines[index]!.scope = value.target.value

                        setTransactions(newLines)
                      }}
                    >
                      <SelectItem value="SCOPE3" text="SCOPE3" default />
                      <SelectItem value="SCOPE2" text="SCOPE2" />
                      <SelectItem value="SCOPE1" text="SCOPE1" />
                    </Select>
                  </Stack>
                </Stack>
              )
            })}
            <ButtonSet>
              <Button
                onClick={() => {
                  const newLines = transactions.concat({
                    transactionDate: undefined,
                    summary: undefined,
                    value: undefined,
                    vat: 19,
                    netValue: undefined,
                    account: "CREDIT",
                    emissions: undefined,
                    scope: "SCOPE3",
                    budgetId: undefined,
                  })
                  setTransactions(newLines)
                }}
                kind="primary"
              >
                Add line item
              </Button>
              <Button
                onClick={() => {
                  const newLines = transactions.slice(0, -1)
                  setTransactions(newLines)
                }}
                disabled={transactions.length === 1}
                kind="secondary"
              >
                Remove last line
              </Button>
            </ButtonSet>

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

export default AddTransactionsForm
