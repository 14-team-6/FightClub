import { Keys } from '../../game/keyboard';

interface CharacterProps {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  vX: number;
  vY: number;
  vMax?: number;
  a?: number;
}

interface CharacterState {
  frameStep: number;
  framePosX: number;
  framePosY: number;
}

class Character {
  props: CharacterProps;

  state: CharacterState;

  constructor(props: CharacterProps) {
    this.props = props;

    this.state = {
      frameStep: 0,
      framePosX: 0,
      framePosY: 0,
    };
  }

  draw() {
    const { props } = this;
    const { state } = this;

    props.ctx.beginPath();
    props.ctx.drawImage(
      props.img,
      state.framePosX,
      state.framePosY,
      props.width,
      props.height,
      props.x,
      props.y,
      props.width,
      props.height,
    );
    props.ctx.closePath();
  }

  update() {
    const width = this.props.ctx.canvas.clientWidth;
    const height = this.props.ctx.canvas.clientHeight;

    if (this.props.x + this.props.width >= width || this.props.x - this.props.width <= 0) {
      this.props.vX = -this.props.vX;
    }
    if (this.props.y + this.props.height >= height || this.props.y - this.props.height <= 0) {
      this.props.vY = -this.props.vY;
    }

    this.props.x += this.props.vX;
    this.props.y += this.props.vX;
  }

  go(dt: number, keys: Keys) {
    const width = this.props.ctx.canvas.clientWidth;

    let k = -1; let
      d = 0;
    if (keys.right || keys.left) {
      k = 1;
    }

    if (keys.left) {
      d = -1;
    } else if (keys.right) {
      d = 1;
    }

    if (this.props.vX < this.props.vMax! && this.props.vX >= 0) {
      this.props.vX += k * this.props.a! * dt;
    } else if (this.props.vX > this.props.vMax!) {
      this.props.vX = this.props.vMax!;
    } else {
      this.props.vX = 0;
    }

    const x = Math.floor(this.props.x + d * (this.props.vX * dt));
    if (x > 0 && x < width - this.props.width) {
      this.props.x = x;
    }
  }

  up() {
    this.props.y -= this.props.vY;
  }

  kick() {

  }
}

export default Character;
