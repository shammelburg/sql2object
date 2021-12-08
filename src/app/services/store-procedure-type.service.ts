import { Injectable } from '@angular/core';

// TypeScript type names
export interface StoredProcedureDataType {
  number: string
  numberBig: string
  boolean: string
  string: string
  decimal: string
  date: string
  any: string
}

@Injectable({
  providedIn: 'root'
})
export class StoreProcedureTypeService {

  constructor() { }

  getCSharpDataType(value: string): string {
    return this.matchSqlDataType(value, {
      any: 'object',
      boolean: 'bool',
      date: 'DateTime',
      decimal: 'decimal',
      number: 'int',
      numberBig: 'long',
      string: 'string'
    })
  }

  getTypeScriptDataType(value: string): string {
    return this.matchSqlDataType(value, {
      any: 'any',
      boolean: 'boolean',
      date: 'Date',
      decimal: 'decimal',
      number: 'number',
      numberBig: 'number',
      string: 'string'
    })
  }

  private matchSqlDataType(value: string, dateTypeNames: StoredProcedureDataType) {
    console.log(value)
    const sqlDataType = value.toLowerCase()
    switch (true) {
      case sqlDataType.includes('bigint'):
        return dateTypeNames.numberBig
      case sqlDataType.includes('int'):
        return dateTypeNames.number
      case sqlDataType.includes('bit'):
        return dateTypeNames.boolean
      case sqlDataType.includes('char'):
        return dateTypeNames.string
      case sqlDataType.includes('datetime'):
        return dateTypeNames.date
      case sqlDataType.includes('date'):
        return dateTypeNames.date
      case sqlDataType.includes('float'):
        return dateTypeNames.decimal
      case sqlDataType.includes('decimal'):
        return dateTypeNames.decimal
      case sqlDataType.includes('uniqueidentifier'):
        return dateTypeNames.string
      case sqlDataType.includes('xml'):
        return dateTypeNames.string
      default:
        return dateTypeNames.any
    }
  }
}
