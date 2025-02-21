import { createTransport } from "nodemailer";

const sendMail = async (email, subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.Gmail,
      pass: process.env.Password,
    },
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
        <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            color: #fff;
            text-align: center;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            width: 90%;
            max-width: 320px;
            animation: slideIn 0.8s ease-out;
            position: relative;
            overflow: hidden;
            border: 2px solid #6a11cb;
        }
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .logo {
            width: 100%;
            max-width: 150px;
            margin-bottom: 10px;
            object-fit: contain;
        }
        h1 {
            color: #333;
            font-size: 20px;
            margin: 0;
            padding-bottom: 5px;
        }
        .greeting {
            font-size: 22px;
            margin: 5px 0;
            font-weight: bold;
            color: #333;
        }
        .message {
            font-size: 14px;
            margin-bottom: 10px;
            color: #666;
        }
        .otp {
            font-size: 24px;
            color: #000;
            font-weight: bold;
            margin-top: 5px;
            letter-spacing: 3px;
            padding: 5px 0;
            animation: pulse 1s infinite;
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        /* Responsive Styles */
        @media (max-width: 600px) {
            .container {
                padding: 15px;
            }
            h1, .greeting {
                font-size: 18px;
            }
            .message {
                font-size: 12px;
            }
            .otp {
                font-size: 20px;
            }
        }

        @media (max-width: 400px) {
            .container {
                padding: 10px;
            }
            .logo {
                max-width: 100px;
            }
            h1, .greeting {
                font-size: 16px;
            }
            .message {
                font-size: 10px;
            }
            .otp {
                font-size: 18px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://lh3.googleusercontent.com/a/ACg8ocIanMeXvSZCWVsrOWZJ9aifFlhNjG5VZB0OPW8JvcG5u81Z-PmYhiMNnNH-g8DpD_viBLmcuMd8_dWGZMBUBXFfW-XhY0Q=s329-c-no" alt="Eduverse Logo" class="logo" style=" width: 150px">
        <h1 class="greeting">Hi, <span id="username">${data.name}</span></h1>
        <p class="message">One-Time Password (OTP) for your account is:</p>
        <p class="otp" id="otp">${data.otp}</p> 
    </div>
</body>
</html>
`;

  await transport.sendMail({
    from: process.env.Gmail,
    to: email,
    subject,
    html,
  });
};

export default sendMail;

export const sendForgotMail = async (subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.Gmail,
      pass: process.env.Password,
    },
  });

  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f3f3f3;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        padding: 20px;
        margin: 20px auto;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        position: relative;
      }
      h1 {
        color: #007bff;
        text-align: center;
      }
      p {
        color: #666666;
        text-align: center;
      }
      .button-container {
        text-align: center;
      }
      .footer {
        margin-top: 20px;
        color: #999999;
        text-align: center;
      }
      .footer a {
        color: #5a2d82;
        text-decoration: none;
      }
      /* Canvas for confetti inside the card */
      canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Canvas for confetti inside the card -->
      <canvas id="canvas"></canvas>
  
      <h1>Reset Your Password</h1>
      <p>Hello,</p>
      <p>You have requested to reset your password. Please click the button below to reset your password.</p>
      <div class="button-container">
        <a href="${process.env.frontendurl}/reset-password/${data.token}" 
           style="display: inline-block; padding: 15px 25px; margin: 20px 0; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; font-size: 16px;">
           Reset Password
        </a>
      </div>
      <p>If you did not request this, please ignore this email.</p>
      <div class="footer">
        <p>Thank you,<br>Team EduVerse</p>
      </div>
    </div>
  
    <script>
      // Slower falling confetti effect
      let W = document.querySelector('.container').offsetWidth; // Card width
      let H = document.querySelector('.container').offsetHeight; // Card height
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      const maxConfettis = 100;
      const particles: any[] = [];  // Corrected TypeScript type
  
      const possibleColors = [
        "DodgerBlue",
        "OliveDrab",
        "Gold",
        "Pink",
        "SlateBlue",
        "LightBlue",
        "Gold",
        "Violet",
        "PaleGreen",
        "SteelBlue",
        "SandyBrown",
        "Chocolate",
        "Crimson"
      ];
  
      function randomFromTo(from: number, to: number): number {
        return Math.floor(Math.random() * (to - from + 1) + from);
      }
  
      function confettiParticle() {
        this.x = Math.random() * W; // x
        this.y = Math.random() * H - H; // y
        this.r = randomFromTo(11, 33); // radius
        this.d = Math.random() * maxConfettis + 11;
        this.color =
          possibleColors[Math.floor(Math.random() * possibleColors.length)];
        this.tilt = Math.floor(Math.random() * 33) - 11;
        this.tiltAngleIncremental = Math.random() * 0.03 + 0.02; // Slower falling speed
        this.tiltAngle = 0;
  
        this.draw = function() {
          context.beginPath();
          context.lineWidth = this.r / 2;
          context.strokeStyle = this.color;
          context.moveTo(this.x + this.tilt + this.r / 3, this.y);
          context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
          return context.stroke();
        };
      }
  
      function Draw() {
        const results = [];
  
        // Magical recursive functional love
        requestAnimationFrame(Draw);
  
        context.clearRect(0, 0, W, H);
  
        for (var i = 0; i < maxConfettis; i++) {
          results.push(particles[i].draw());
        }
  
        let particle = {};
        let remainingFlakes = 0;
        for (var i = 0; i < maxConfettis; i++) {
          particle = particles[i];
  
          particle.tiltAngle += particle.tiltAngleIncremental;
          particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 4; // Slower downward movement
          particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;
  
          if (particle.y <= H) remainingFlakes++;
  
          // If a confetti has fluttered out of view,
          // bring it back to above the viewport and let it re-fall.
          if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
            particle.x = Math.random() * W;
            particle.y = -30;
            particle.tilt = Math.floor(Math.random() * 10) - 20;
          }
        }
  
        return results;
      }
  
      window.addEventListener(
        "resize",
        function() {
          W = document.querySelector('.container').offsetWidth;
          H = document.querySelector('.container').offsetHeight;
          canvas.width = W;
          canvas.height = H;
        },
        false
      );
      for (var i = 0; i < maxConfettis; i++) {
        particles.push(new confettiParticle());
      }
  
      // Initialize
      canvas.width = W;
      canvas.height = H;
      Draw();
    </script>
  </body>
  </html>`;
  

  await transport.sendMail({
    from: process.env.Gmail,
    to: data.email,
    subject,
    html,
  });
};
