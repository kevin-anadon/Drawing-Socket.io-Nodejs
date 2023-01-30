const init = (event) => {
  const leaveSpan = document.getElementById("usersLeave");
  const connectedSpan = document.getElementById("usersConnected");

  let mouse = {
    click: false,
    move: false,
    pos: {
      x: 0,
      y: 0,
    },
    prev_pos: false,
  };

  // Canvas
  const canvas = document.getElementById("drawing");
  const context = canvas.getContext("2d");
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  // socket connection
  const socket = io();

  socket.on("draw_line", (data) => {
    const line = data.line;
    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(line[0].x * width, line[0].y * height);
    context.lineTo(line[1].x * width, line[1].y * height);
    context.stroke();
  });

  socket.on("leaved", (data) => {
    console.log(data.leave);
    leaveSpan.innerHTML = data.leave;
  });

  socket.on("connected", (data) => {
    connectedSpan.innerHTML = data.users;
  });

  canvas.addEventListener("mousedown", (e) => {
    mouse.click = true;
  });

  canvas.addEventListener("mouseup", (e) => {
    mouse.click = false;
  });

  canvas.addEventListener("mousemove", (e) => {
    mouse.pos.x = e.clientX / width; // Adapts to screen changes
    mouse.pos.y = e.clientY / height;
    mouse.move = true;
  });

  // recursive function
  const main = () => {
    if (mouse.click && mouse.move && mouse.prev_pos) {
      socket.emit("draw_line", {
        line: [mouse.pos, mouse.prev_pos],
      });
      mouse.move = false;
    }
    mouse.prev_pos = { x: mouse.pos.x, y: mouse.pos.y };
    setTimeout(main, 25);
  };
  main();
};

document.addEventListener("DOMContentLoaded", init);
