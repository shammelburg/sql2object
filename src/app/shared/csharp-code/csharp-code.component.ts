import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-csharp-code',
  templateUrl: './csharp-code.component.html',
  styleUrls: ['./csharp-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CsharpCodeComponent implements OnInit {

  @Input()
  props: any = []

  constructor() { }

  ngOnInit(): void {
  }

}
