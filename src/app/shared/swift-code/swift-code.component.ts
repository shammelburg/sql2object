import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-swift-code',
  templateUrl: './swift-code.component.html',
  styleUrls: ['./swift-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwiftCodeComponent implements OnInit {

  @Input()
  props: any = []

  constructor() { }

  ngOnInit(): void {
  }

}
