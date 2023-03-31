import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-json-to-sql-table',
  templateUrl: './json-to-sql-table.component.html',
  styleUrls: ['./json-to-sql-table.component.scss']
})
export class JsonToSqlTableComponent implements OnInit {

  sqlTypes: string[] = [
    'Result',
    'Stored Procedure'
  ]

  objectTypes: string[] = [
    'C#',
    'TypeScript',
    'Swift'
  ]

  form: FormGroup = new FormGroup({})
  generatedObject = new FormControl({ content: null })

  constructor(
    private fb: FormBuilder,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('JSON 2 SQL Table | sql2object | A developer tool')
    this.form = this.fb.group({
      jsonData: [`{
        "Id": 1,
        "FirstName": "Angular",
        "LastName": "App",
        "IsFramework": true,
        "Created": "2023-03-31T15:00:00",
        "Address": {
             "Line1": "Scope Block",
             "Line2": "JavaScript Lane",
             "PostalCode": "ES6 2023"
        }
}
            
      `, Validators.required],
      nulls: [false]
    })
  }

  copyObject() {
    const objectData = document.getElementById('copy-content')?.innerText
    navigator.clipboard.writeText(<string>objectData).then(function () {
      console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  processJSONData() {
    const form = this.form.value
    const data = JSON.parse(form.jsonData)

    let tableColumns: any[] = []
    let jsonObjects: any[] = []

    const keys = Object.keys(data)

    keys.forEach(key => {
      const keyValue = data[key]

      if (typeof (keyValue) === 'object') {
        jsonObjects.push(key)
      } else {
        tableColumns.push({
          columnName: key,
          jsonDataType: typeof (keyValue),
          sqlDataType: this.convertToSqlDataType(key, keyValue, typeof (keyValue)),
          null: keyValue === null,
          value: keyValue
        })
      }
    });

    jsonObjects.forEach(key => {
      const keys = Object.keys(data[key])
      keys.forEach(x => {
        const value = data[key][x]
        const jsonDataType = typeof (value)
        const columnName = `${key}_${x}`
        tableColumns.push({
          columnName,
          jsonDataType,
          sqlDataType: this.convertToSqlDataType(columnName, value, jsonDataType),
          null: value === null,
          value
        })
      })
    });

    const mappedTableColumns = tableColumns.map(column => ({ ...column, null: this.form.value.nulls ? true : column.null }))

    console.table(mappedTableColumns)

    // const initSqlTable = `CREATE TABLE [dbo].[MyJsonTable] (`
    // const createSqlTable = tableColumns.map(d => `  [${d.columnName}] ${d.sqlDataType}${d.sqlDataType === 'nvarchar' ? '(255)' : ''} ${d.null ? 'NULL' : 'NOT NULL'},`)
    // const endSqlTable = ')'
    // createSqlTable.unshift(initSqlTable)
    // createSqlTable.push(endSqlTable)

    // console.log(createSqlTable.join('\n'))

    this.generatedObject.setValue({ content: mappedTableColumns })
  }

  convertToSqlDataType(propName: string, value: any, dataType: string) {

    value = value || ''
    const isNULL = value === 'NULL'
    const isEmpty = value === ''

    const isNumber = /^[0-9]+$/g.test(value)
    const endsWithIdText = propName.toLowerCase().endsWith('id')

    const isDecimal = /^[-+]?[0-9]+\.[0-9]+$/.test(value)
    const hasDot = value.toString().includes('.')

    const dateWords = ['date', 'modified', 'time', 'create', 'update']
    const hasDateText = dateWords.some(dateWord => propName.toLowerCase().includes(dateWord))
    const date = new Date(value)

    switch (true) {
      // bit        
      case dataType === 'boolean':
        return 'bit'

      // date options        
      case hasDateText && date instanceof Date && !isNaN(date.valueOf()):
        return 'datetime'
      case hasDateText && isNULL:
        return 'datetime'

      // decimal
      case hasDot && isDecimal:
        return 'decimal(18,6)'
      case isDecimal:
        return 'decimal(18,6)'

      // int options
      case dataType === 'number':
        return 'int'
      case endsWithIdText && isNULL:
        return 'int'
      case endsWithIdText && isNumber:
        return 'int'
      case isNumber:
        return 'int'

      // uanble to define data type from value
      case isNULL:
        return 'nvarchar'

      // nvarchar
      case isEmpty:
        return 'unknown'

      default:
        return 'nvarchar'
    }
  }
}