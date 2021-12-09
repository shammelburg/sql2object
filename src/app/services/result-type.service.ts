import { Injectable } from '@angular/core';
import { ResultDataType } from '../models/object.model';

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
      decimal: 'number',
      decimalNull: 'number | null',
      number: 'number',
      numberNull: 'number | null',
      string: 'string'
    })
  }

  getSwiftDataType(propName: string, value: string): string {
    return this.matchResultDataType(propName, value, {
      any: 'Any',
      boolean: 'Bool',
      booleanNull: 'boolean?',
      date: 'Date',
      dateNull: 'Date?',
      decimal: 'Decimal',
      decimalNull: 'Decimal?',
      number: 'Int',
      numberNull: 'Int?',
      string: 'String'
    })
  }

  private matchResultDataType(propName: string, value: string, dateTypeNames: ResultDataType) {
    value = value || ''
    
    const isNULL = value === 'NULL'
    const isEmpty = value === ''

    const isNumber = /\d+/g.test(value)
    const endsWithIdText = propName.toLowerCase().endsWith('id')
    const intWords = ['count', 'total']
    const hasIntText = intWords.some(intWord => propName.toLowerCase().includes(intWord))

    const isDecimal = /^\d{1,10}(\.\d{1,8})?$/.test(value)
    const hasDot = value.includes('.')

    const dateWords = ['date', 'modified']
    const hasDateText = dateWords.some(dateWord => propName.toLowerCase().includes(dateWord))
    const date = new Date(value)

    const bitWords = ['active']
    const hasBitText = bitWords.some(bitWord => propName.toLowerCase().includes(bitWord))

    switch (true) {
      // decimal
      case hasDot && isDecimal:
        return dateTypeNames.decimal

      // int options
      case endsWithIdText && isNULL:
        return dateTypeNames.numberNull
      case endsWithIdText && isNumber:
        return dateTypeNames.number
      case hasIntText && isNumber:
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
