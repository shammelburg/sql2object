import { Injectable } from '@angular/core';
import { StoredProcedureDataType } from '../models/object.model';

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
      decimal: 'number',
      number: 'number',
      numberBig: 'number',
      string: 'string'
    })
  }

  getSwiftDataType(value: string): string {
    return this.matchSqlDataType(value, {
      any: 'Any',
      boolean: 'Bool',
      date: 'Date',
      decimal: 'Decimal',
      number: 'Int',
      numberBig: 'Int',
      string: 'String'
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
