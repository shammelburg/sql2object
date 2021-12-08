import { Injectable } from '@angular/core';

// TypeScript type names
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

@Injectable({
  providedIn: 'root'
})
export class ResultTypeService {

  constructor() { }

  getCSharpDataType(propName: string, value: string): string {
    return this.matchResultDataType(propName, value, {
      any: 'object',
      boolean: 'bool',
      booleanNull: 'bool?',
      date: 'DateTime',
      dateNull: 'DateTime?',
      decimal: 'decimal',
      decimalNull: 'decimal?',
      number: 'int',
      numberNull: 'int?',
      string: 'string'
    })
  }

  getTypeScriptDataType(propName: string, value: string): string {
    return this.matchResultDataType(propName, value, {
      any: 'any',
      boolean: 'boolean',
      booleanNull: 'boolean | null',
      date: 'Date',
      dateNull: 'Date | null',
      decimal: 'decimal',
      decimalNull: 'decimal | null',
      number: 'number',
      numberNull: 'number | null',
      string: 'string'
    })
  }

  private matchResultDataType(propName: string, value: string, dateTypeNames: ResultDataType) {
    const isNULL = value === 'NULL'
    const isEmpty = value === ''

    const isNumber = !isNaN(parseInt(value))
    const endsWithIdText = propName.toLowerCase().endsWith('id')
    const intWords = ['count', 'total']
    const hasIntText = intWords.some(intWord => propName.toLowerCase().includes(intWord))

    const isDecimal = !isNaN(parseFloat(value))
    const hasDot = propName.toLowerCase().includes('.')

    const dateWords = ['date', 'modified']
    const hasDateText = dateWords.some(dateWord => propName.toLowerCase().includes(dateWord))
    const date = new Date(value)

    const bitWords = ['active']
    const hasBitText = bitWords.some(bitWord => propName.toLowerCase().includes(bitWord))

    switch (true) {
      // int options
      case endsWithIdText && isNULL:
        return dateTypeNames.numberNull
      case endsWithIdText && isNumber:
        return dateTypeNames.number
      case hasIntText && isNumber:
        return dateTypeNames.number

      // decimal
      case hasDot && isDecimal:
        return dateTypeNames.number

      // date options
      case hasDateText && date instanceof Date && !isNaN(date.valueOf()):
        return dateTypeNames.date
      case hasDateText && isNULL:
        return dateTypeNames.dateNull

      // nvarchar
      case isEmpty:
        return dateTypeNames.string

      // bit
      case hasBitText && value.length === 1 && (value === '0' || value === '1'):
        return dateTypeNames.boolean
      case value.length === 1 && (value === '0' || value === '1'):
        return dateTypeNames.boolean
      case hasBitText && isNULL:
        return dateTypeNames.booleanNull

      // uanble to define data type from value
      case isNULL:
        return dateTypeNames.any

      default:
        return dateTypeNames.string
    }
  }
}
