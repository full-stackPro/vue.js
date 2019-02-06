
/**
 * FieldSet is an Object which contains `Measure Conditions` data => {types, expression}
 */
export const FieldSet = {
    types: [
        {
            name: 'Count',
            value: 'count',
            isNumeric: false
        },
        {
            name: 'Count distinct',
            value: 'count_distinct',
            isNumeric: false
        },
        {
            name: 'Sum',
            value: 'sum',
            isNumeric: true
        },
        {
            name: 'Max',
            value: 'max',
            isNumeric: true
        },
        {
            name: 'Min',
            value: 'min',
            isNumeric: true
        }
    ],
    expressions: [
        {
            name: 'Equals',
            value: 'equals',
            entries: 1
        },
        {
            name: 'Does not equal',
            value: 'does_not_equal',
            entries: 1
        },
        {
            name: 'Is less than',
            value: 'is_less_than',
            entries: 1
        },
        {
            name: 'Is greater than',
            value: 'is_greater_than',
            entries: 1
        },
        {
            name: 'Is between',
            value: 'is_between',
            entries: 2
        },
        {
            name: 'Is not between',
            value: 'is_not_between',
            entries: 2
        }
    ]
};