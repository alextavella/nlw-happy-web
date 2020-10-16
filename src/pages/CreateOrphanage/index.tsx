import { LeafletMouseEvent } from "leaflet";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { FiPlus } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useHistory } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import "../../styles/pages/create-orphanage.css";
import happyMapIcon from "../../utils/mapIcon";

interface PositionProps {
  latitude: number;
  longitude: number;
}

const CreateOrphanage: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [opening_hours, setOpeningHours] = useState<string>("");
  const [open_on_weekends, setOpenOnWeekends] = useState<boolean>(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [position, setPosition] = useState<PositionProps>();

  const isEnableButton = useMemo<boolean>(
    () => !!position && !!name && !!about && !!instructions && !!opening_hours,
    [about, instructions, name, opening_hours, position]
  );

  const handleClickMap = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      try {
        const data = new FormData();
        data.append("name", name);
        data.append("latitude", String(position!.latitude));
        data.append("longitude", String(position!.longitude));
        data.append("about", about);
        data.append("about", about);
        data.append("instructions", instructions);
        data.append("opening_hours", opening_hours);
        data.append("open_on_weekends", String(open_on_weekends));

        images.forEach((image) => {
          data.append("images", image);
        });

        await api.post("/orphanages", data);

        history.push("/app");
      } catch (err) {
        console.log(err);
      }
    },
    [
      about,
      history,
      images,
      instructions,
      name,
      open_on_weekends,
      opening_hours,
      position,
    ]
  );

  const handleSelectImages = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;

      if (!files) {
        return;
      }

      const selectedImages = Array.from(files);

      setImages(selectedImages);

      const selectedImagesPreview = selectedImages.map((file) =>
        URL.createObjectURL(file)
      );

      setPreviewImages(selectedImagesPreview);
    },
    []
  );

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-23.704937, -46.5916816]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onClick={handleClickMap}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position && (
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 600 caracteres</span>
              </label>
              <textarea
                id="about"
                maxLength={600}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image) => (
                  <img src={image} alt="Preview" key={image} />
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input
                type="file"
                id="image[]"
                multiple
                onChange={handleSelectImages}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={(event) => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button
            className="confirm-button"
            type="submit"
            disabled={!isEnableButton}
          >
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
};

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;

export default CreateOrphanage;
