import  '../styles/SongAdminRow.module.css';
import styles from '../styles/btnstyle.module.css';
import { useAuth } from "../../../context/AuthContext";

interface RowProps {
  data: any;
  index: any,
  onEdit?: (func: any) => void;
  onDelete?: (func: any) => void;
}

export default function Row({
  data,
  index,
  onEdit,
  onDelete
}: RowProps) {

  const auth = useAuth();
     
       if (!auth) {
        console.log("Row");
        console.log(data);
         return null;
       }
     
  const { user } = auth;

  // Se o objeto data vier vazio ou nulo, previne erros de leitura
  if (!data) return null;

  return (
    <tr>

      <td>
        <span className={styles.indexNumber}>{index}</span>
      </td>

      
      <td>

        <div className={styles.datatableinfo}>

          <img style={{
            'borderRadius':'90px',
            'maxWidth':'50px',
            'maxHeight':'50px'
          }}
            src={
              data.imageUrl
                ? `http://localhost:5000/uploads/covers/${data.imageUrl}`
                : "/user-default.jpg"
            }
            alt=""
            width={100}
            height={100}
          />

          <div>

            <strong>
            </strong>
             <br/>
            <span style={{ 'textAlign': 'center'}}>
              {data?.stageName || 'undefined'}
            </span>

          </div>

        </div>

      </td>

      <td>
        active
      </td>


      <td>
        {new Date(
          data.createdAt
        ).toLocaleDateString("pt-PT")}
      </td>


      <td>
        {new Date(
          data.updatedAt
        ).toLocaleDateString("pt-PT")}
      </td>

       {/* AÇÕES */}
      <td>
        {user?.role === "ADMIN" && (
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.editButton}
              onClick={() => onEdit?.(data)}
              title="Editar música"
            >
              <i
                className="fa fa-eye"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => onDelete?.(data)}
              title="Remover música"
            >
              <i
                className="fa fa-trash"
                aria-hidden="true"
              />
            </button>
          </div>
        )}
      </td>

    
    </tr>



    
  );
}