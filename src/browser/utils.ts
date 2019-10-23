import { spawn } from 'child_process'

export const xvfb = (env: NodeJS.ProcessEnv, width: number, height: number, bitDepth: number) => spawn('Xvfb', [
    env.DISPLAY,
    '-ac',
    '-screen', '0', `${width}x${height}x${bitDepth}`
], {
    stdio: [
        'ignore',
        'inherit',
        'inherit'
    ]
})

export const pulseaudio = (env: NodeJS.ProcessEnv) => spawn('pulseaudio', [
    '--exit-idle-time=-1',
    '--file=/tmp/pulse_config.pa',
    '--daemonize=no'
], {
    env,
    stdio: [
        'ignore',
        'inherit',
        'inherit'
    ]
})

export const openbox = (env: NodeJS.ProcessEnv) => spawn('openbox', [], {
    env,
    stdio: [
        'ignore',
        'inherit',
        'inherit'
    ]
})

export const chromium = (env: NodeJS.ProcessEnv, startupUrl) => {
    const config = [
        '-browser',
        '-no-remote',
        '-safe-mode',
        '-foreground',
        '-new-instance',
        '-private-window',

        `-display=${env.DISPLAY}`,
        `-new-window ${env.STARTUP_URL}`,
        `-window-size ${env.VIDEO_WIDTH},${env.VIDEO_HEIGHT}`
    ]

    if(process.env.IS_CHROMIUM_DARK_MODE === 'false')
        config.splice(config.indexOf('-force-dark-mode'), 1)

    return spawn('firefox', [
        ...config,
        startupUrl
    ], {
        env,
        stdio: [
            'ignore',
            'inherit',
            'inherit'
        ]
    })
}

export const ffmpeg = (env: NodeJS.ProcessEnv, token: string, width: number, height: number, fps: string, bitrate: string) => spawn('ffmpeg', [
    '-f', 'x11grab',
    '-s', `${width}x${height}`,
    '-r', fps,
    '-i', env.DISPLAY,
    '-an',

    '-f', 'mpegts',
    '-c:v', 'mpeg1video',
    '-b:v', bitrate,
    '-bf', '0',

    `${env.STREAMING_URL || env.APERTURE_URL}/?t=${token}`
], {
    env,
    stdio: [
        'ignore',
        'inherit',
        'inherit'
    ]
})

export const ffmpegaudio = (env: NodeJS.ProcessEnv, token: string, bitrate: string) => spawn('ffmpeg', [
    '-f', 'alsa',
    '-ac', '2',
    '-ar', '44100',
    '-i', 'default',
    '-vn',

    '-f', 'mpegts',
    '-c:a', 'mp2',
    '-b:a', bitrate,

    `${env.STREAMING_URL || env.APERTURE_URL}/?t=${token}`
], {
    env,
    stdio: [
        'ignore',
        'inherit',
        'inherit'
    ]
})

export const xdotool = (env: NodeJS.ProcessEnv) => spawn('xdotool', ['-'], {
    env,
    stdio: [
        'pipe',
        'inherit',
        'inherit'
    ]
})
