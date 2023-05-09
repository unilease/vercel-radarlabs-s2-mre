import s2radar from '@radarlabs/s2';
const { LatLng, RegionCoverer } = s2radar;

export default async (req, res) => {
  try {
    // const { latitude, longitude, miles = 30 } = req.body;

    const latitude = 30.2442132;
    const longitude = -97.8334001;
    const miles = 30;

    const point = new LatLng(latitude, longitude);
    const meters = miles * 1609.344;
    const cells = RegionCoverer.getRadiusCovering(point, meters, { min: 0, max: 30, max_cells: 8 });
    const tokens = cells.cellIds().map((id) => id.token());

    res.json({ latitude, longitude, miles, tokens });
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
};
