class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  static load(info) {
    const points = info.points.map((i) => new Point(i.x, i.y));
    const segments = info.segments.map(
      (i) =>
        new Segment(
          points.find((p) => p.equals(i.p1)),
          points.find((p) => p.equals(i.p2))
        )
    );

    // for (const pointInfo of info.points) {
    //   points.push(new Point(pointInfo.x, pointInfo.y));
    // }
    // for (const segInfo of info.segments) {
    //   points.push(
    //     new Segment(
    //       points.find((p) => p.equals(segInfo.p1)),
    //       points.find((p) => p.equals(segInfo.p2))
    //     )
    //   );
    // }

    return new Graph(points, segments);
  }

  addPoint(point) {
    this.points.push(point);
  }

  addSegment(segment) {
    this.segments.push(segment);
  }

  containsPoint(point) {
    return this.points.find((p) => p.equals(point));
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  // tryAddSegment(segment) {
  //   if (!segment.p1.equals(segment.p2) && !this.containsSegment(segment)) {
  //     this.addSegment(segment);
  //     console.log(segment.p1, segment.p2);
  //     return true;
  //   }
  //   return false;
  // }

  removeSegment(segment) {
    this.segments.splice(this.segments.indexOf(segment), 1);
  }
  removePoint(point) {
    const segments = this.getSegmentsWithPoint(point);
    for (const segment of segments) {
      this.removeSegment(segment);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }

  containsSegment(segment) {
    return this.segments.find((s) => s.equals(segment));
  }

  tryAddSegment(segment) {
    if (this.points.length < 2) {
      console.log("needs atleast 2 points");
      return false;
    }
    if (!this.containsSegment(segment) && !segment.p1.equals(segment.p2)) {
      this.addSegment(segment);
      return true;
    }
    return false;
  }

  getSegmentsWithPoint(point) {
    const segments = [];
    for (const segment of this.segments) {
      if (segment.includes(point)) {
        segments.push(segment);
      }
    }
    console.log("getSegmentsWithPoint");
    return segments;
  }

  dispose() {
    this.points.length = 0;
    this.segments.length = 0;
  }

  draw(ctx) {
    for (const segment of this.segments) {
      segment.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}
