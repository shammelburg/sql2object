export interface SQL2ObjectFormData {
    sqlType: string
    objectType: string
    sqlTextData: string
    isLowerCamelCase: boolean
}

export interface StoredProcedureDataType {
    number: string
    numberBig: string
    boolean: string
    string: string
    decimal: string
    date: string
    any: string
}

export interface ResultDataType {
    number: string
    numberNull: string,
    boolean: string
    booleanNull: string
    string: string
    decimal: string
    decimalNull: string
    date: string
    dateNull: string
    any: string
}