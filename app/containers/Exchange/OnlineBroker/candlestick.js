import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { Box } from "@chakra-ui/react";
import ResizeObserver from "resize-observer-polyfill";
import { GetURL } from "utils/urlMap";
import { api } from "utils/network";

const CandleStick = ({ market }) => {
  const chartRef = useRef(0);
  let chart;
  useEffect(() => {
    api.post(GetURL("price-ticker"), { market: market }).then((response) => {
      // setMarket({ ...market, data: response.data?.data });
      const data = response.data?.data;
      draw(data);
    });
  }, [chartRef]);

  const draw = (data) => {
    chart = createChart(chartRef.current, {
      width: chartRef.current?.clientWidth,
      height: 300,
      layout: {
        backgroundColor: "#000",
        textColor: "rgba(255, 255, 255, 0.8)",
      },
      grid: {
        vertLines: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        horzLines: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      rightPriceScale: {
        borderColor: "rgba(255, 255, 255, 0.8)",
      },
      timeScale: {
        borderColor: "rgba(255, 255, 255, 0.8)",
        timeVisible: true,
        secondsVisible: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });

    const lineSeries = chart.addCandlestickSeries({
      upColor: "rgb(38,166,154)",
      downColor: "rgb(255,82,82)",
      wickUpColor: "rgb(38,166,154)",
      wickDownColor: "rgb(255,82,82)",
      borderVisible: false,
    });

    chart.timeScale().fitContent();

    lineSeries.setData(data);
    const resizeObserver = new ResizeObserver((entries) => {
      chart.applyOptions({
        width: chartRef.current?.clientWidth,
        height: chartRef.current?.clientHeight,
      });
      chart.timeScale().fitContent();
    });
    resizeObserver.observe(chartRef.current);
  };
  return <Box w={["sm", "100%"]} ref={chartRef} />;
};

export { CandleStick };
