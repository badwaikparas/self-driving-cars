class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
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

  // containsSegment(segment) {
  //   return this.segments.find(
  //     (s) =>
  //       (s.p1.equals(segment.p1) && s.p2.equals(segment.p2)) ||
  //       (s.p2.equals(segment.p1) && s.p1.equals(segment.p2))
  //   );
  // }

  containsSegment(segment) {
    return this.segments.some(
      (s) =>
        (s.p1.equals(segment.p1) && s.p2.equals(segment.p2)) ||
        (s.p1.equals(segment.p2) && s.p2.equals(segment.p1))
    );
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  // tryAddSegment(segment) {
  //   if (!this.containsSegment(segment)) {
  //     this.addSegment(segment);
  //     console.log(segment.p1, segment.p2);
  //     return true;
  //   }
  //   return false;
  // }

  tryAddSegment(segment) {
    if (!segment.p1.equals(segment.p2) && !this.containsSegment(segment)) {
      this.addSegment(segment);
      console.log(segment.p1, segment.p2);
      return true;
    }
    return false;
  }

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}
