interface FormattedTimeProps {
  time: number
}

export default function FormattedTime({time}: FormattedTimeProps) {

  function getMinutes(time: number) {
    let number = Math.floor(time / 60000);
    let minutes = number % 60;
    if (minutes > 0) {
      return <span><span>{("0" + minutes).slice(-2)}</span>:</span>
    }
  }

  function getSeconds(time: number) {
    return <span><span>{("0" + Math.floor(time / 1000) % 60).slice(-2)}</span>.</span>;
  }

  function getMilliseconds(time: number) {
    return <span>{("0" + (time / 10) % 1000).slice(-2)}</span>;
  }

  return <div>
    {getMinutes(time)}
    {getSeconds(time)}
    {getMilliseconds(time)}
  </div>
}


